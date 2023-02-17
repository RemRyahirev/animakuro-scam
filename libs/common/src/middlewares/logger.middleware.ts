import { Logger } from '@nestjs/common';

export function LoggerMiddleware(
    req: { headers: { [x: string]: string } },
    res: any,
    next: () => void,
): any {
    Logger.debug(
        `💬  ${
            req.headers['user-agent']
                ? req.headers['user-agent'].split(') ')[0]
                : req.headers
        })`,
        'Bootstrap',
        false,
    );
    next();
}
