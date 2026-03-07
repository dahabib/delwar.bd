import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

const auth = SvelteKitAuth({
  providers: [
    GitHub({
      clientId: 'Ov23liwf0HmSXMoCXTLx',
      clientSecret: '0acc7438d59646859a37dace4036c1a6c06a32c5',
    }),
  ],
  secret: 'A/XoH8c1L6+QnqQ7+OASVRY2AwJvabJMINVjiHXjW7k=',
  trustHost: true,
});

export const { GET, POST } = auth;
