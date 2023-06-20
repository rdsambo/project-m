export default function checkEnvironment(): string {
  const envUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://trello-sepia-gamma.vercel.app';

  console.log(envUrl);

  //'https://trello-sepia-gamma.vercel.app

  return envUrl;
}
