import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy, type Profile as FacebookProfile } from 'passport-facebook';
import { env } from '../config/env';
import { UserModel, type UserDocument } from '../models/User';

const getPrimaryEmail = (emails: Array<{ value: string }> | undefined): string | null => {
  const v = emails?.[0]?.value?.trim();
  return v && v.length > 0 ? v.toLowerCase() : null;
};

const upsertOAuthUser = async (params: {
  provider: 'google' | 'facebook';
  providerId: string;
  email: string | null;
  displayName: string | null;
}): Promise<UserDocument> => {
  const { provider, providerId, email, displayName } = params;

  // Prefer linking by provider id first
  const providerField = provider === 'google' ? 'googleId' : 'facebookId';
  const existingByProvider = await UserModel.findOne({ [providerField]: providerId }).exec();
  if (existingByProvider) return existingByProvider;

  // If we have an email, link to existing local account (or create new)
  if (email) {
    const existingByEmail = await UserModel.findOne({ email }).exec();
    if (existingByEmail) {
      (existingByEmail as unknown as Record<string, unknown>)[providerField] = providerId;
      if (!existingByEmail.name && displayName) existingByEmail.name = displayName;
      await existingByEmail.save();
      return existingByEmail;
    }
  }

  // Create new user
  const name = (displayName ?? '').trim() || 'משתמש/ת';
  const created = await UserModel.create({
    name,
    email: email ?? `${provider}-${providerId}@no-email.local`,
    role: 'client',
    [providerField]: providerId,
  });
  return created;
};

export const initPassport = () => {
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${env.SERVER_ORIGIN}/api/auth/oauth/google/callback`,
        },
        async (_accessToken, _refreshToken, profile: GoogleProfile, done) => {
          try {
            const email = getPrimaryEmail(profile.emails as Array<{ value: string }> | undefined);
            const user = await upsertOAuthUser({
              provider: 'google',
              providerId: profile.id,
              email,
              displayName: profile.displayName ?? null,
            });
            return done(null, user);
          } catch (e) {
            return done(e as Error);
          }
        },
      ),
    );
  }

  if (env.FACEBOOK_APP_ID && env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: env.FACEBOOK_APP_ID,
          clientSecret: env.FACEBOOK_APP_SECRET,
          callbackURL: `${env.SERVER_ORIGIN}/api/auth/oauth/facebook/callback`,
          profileFields: ['id', 'displayName', 'emails'],
        },
        async (_accessToken, _refreshToken, profile: FacebookProfile, done) => {
          try {
            // Facebook emails may be missing depending on app permissions/user settings
            const anyProfile = profile as unknown as { emails?: Array<{ value: string }> };
            const email = getPrimaryEmail(anyProfile.emails);
            const user = await upsertOAuthUser({
              provider: 'facebook',
              providerId: profile.id,
              email,
              displayName: (profile as unknown as { displayName?: string }).displayName ?? null,
            });
            return done(null, user);
          } catch (e) {
            return done(e as Error);
          }
        },
      ),
    );
  }

  return passport;
};


