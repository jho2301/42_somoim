const Campus = {
	MAROC1337: 1,
	BELGIQUE19: 2,
	RUSSIE21: 3,
	LYON: 4,
	MADRID: 5,
	PARIS: 6,
	SAOPAULO: 7,
	SEOUL: 8,
	SILICON_VALLEY: 9,
	TOKYO: 10,
	CODAM: 11,
	HIVE: 12
}

async function getUserCampus(email) {
	let emailTemp = email.split('@');
	if (emailTemp[1].indexOf('student') !== -1)
		emailTemp = emailTemp[1].split('student.');

	switch (emailTemp[1]) {
		case '1337.ma':
			return (Campus.MAROC1337);
		case '19.be':
			return (Campus.BELGIQUE19);
		case '21-school.ru':
			return (Campus.RUSSIE21);
		case 'le-101.fr':
			return (Campus.LYON);
		case '42madrid.com':
			return (Campus.MADRID);
		case '42.fr':
			return (Campus.PARIS);
		case '42sp.org.br':
			return (Campus.SAOPAULO);
		case '42seoul.kr':
			return (Campus.SEOUL);
		case '42.us.org':
			return (Campus.SILICON_VALLEY);
		case '42tokyo.jp':
			return (Campus.TOKYO);
		case 'codam.nl':
			return (Campus.CODAM);
		default :
			return (-1);
	}
}

exports.getUserCampus = getUserCampus;
exports.Campus = Campus;
