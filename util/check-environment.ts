export default function checkEnvironment(): string {
  const envUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://vmi840200.contaboserver.net:3000'
      : 'http://vmi840200.contaboserver.net:3000';

  //'https://trello-sepia-gamma.vercel.app

  return envUrl;
}
