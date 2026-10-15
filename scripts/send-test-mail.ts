/**
 * SMTP 설정 확인용 테스트 메일 발송 스크립트
 *
 *   npm run mail:test                    → EMAIL_FROM 주소로 발송
 *   npm run mail:test -- you@example.com → 지정한 주소로 발송
 *
 * .env의 EMAIL_SERVER / EMAIL_FROM을 그대로 사용하므로,
 * 앱을 띄우지 않고도 "이 SMTP 설정으로 메일이 나가는지"를 먼저 확인할 수 있다.
 * 로컬 Mailpit(smtp://localhost:1025)이면 http://localhost:8025 에서 받은 메일을 확인한다.
 */
import nodemailer from 'nodemailer';

async function main() {
    const server = process.env.EMAIL_SERVER;
    const from = process.env.EMAIL_FROM;
    if (!server || !from) {
        throw new Error('.env에 EMAIL_SERVER와 EMAIL_FROM을 설정해 주세요.');
    }
    const to = process.argv[2] ?? from;

    const transport = nodemailer.createTransport(server);
    // verify(): 실제 발송 전에 SMTP 서버 접속·인증이 되는지 먼저 확인
    await transport.verify();

    const info = await transport.sendMail({
        from,
        to,
        subject: '[우분투북스] SMTP 테스트 메일',
        text: 'EMAIL_SERVER 설정으로 메일이 정상 발송되었습니다.',
    });
    console.log(`발송 완료: ${to} (messageId: ${info.messageId})`);
}

main().catch((error) => {
    console.error('발송 실패:', error instanceof Error ? error.message : error);
    process.exit(1);
});
