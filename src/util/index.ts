import { Campus } from '../model';
import { UsersInfoResult } from '../interface';
import app from '../app';

export async function getUserCampusNo(userID: string): Promise<number> {
  const { user }: UsersInfoResult = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: userID,
  });

  let parsedEmail: string[] = user.profile.email.split('@');
  if (parsedEmail[1].indexOf('student') !== -1) parsedEmail = parsedEmail[1].split('student.');

  switch (parsedEmail[1]) {
    case '1337.ma':
      return Campus.MAROC1337;
    case '19.be':
      return Campus.BELGIQUE19;
    case '21-school.ru':
      return Campus.RUSSIE21;
    case 'le-101.fr':
      return Campus.LYON;
    case '42madrid.com':
      return Campus.MADRID;
    case '42.fr':
      return Campus.PARIS;
    case '42sp.org.br':
      return Campus.SAOPAULO;
    case '42seoul.kr':
      return Campus.SEOUL;
    case '42.us.org':
      return Campus.SILICON_VALLEY;
    case '42tokyo.jp':
      return Campus.TOKYO;
    case 'codam.nl':
      return Campus.CODAM;
    default:
      return -1;
  }
}

export async function getUserCampusName(campusNo: number): Promise<string> {
  switch (campusNo) {
    case Campus.MAROC1337:
      return '1337';
    case Campus.BELGIQUE19:
      return '19';
    case Campus.RUSSIE21:
      return '21';
    case Campus.LYON:
      return '42lyon';
    case Campus.MADRID:
      return '42madrid';
    case Campus.PARIS:
      return '42paris';
    case Campus.SAOPAULO:
      return '42saopaulo';
    case Campus.SEOUL:
      return '42seoul';
    case Campus.SILICON_VALLEY:
      return '42sv';
    case Campus.TOKYO:
      return '42tokyo';
    case Campus.CODAM:
      return 'codam';
    default:
      return 'undefined campus';
  }
}

export function urlFormatter(url: string): string {
  let ParsedURL = url.split('https://');
  if (ParsedURL.length !== 1) return url;
  ParsedURL = url.split('http://');
  if (ParsedURL.length !== 1) return url;
  return `https://${url}`;
}
