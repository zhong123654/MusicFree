import {logger, fileAsyncTransport} from 'react-native-logs';
import RNFS from 'react-native-fs';
import pathConst from '@/constants/pathConst';
import Config from '../core/config';
import {addLog} from '@/lib/react-native-vdebug/src/log';

const config = {
    transport: fileAsyncTransport,
    transportOptions: {
        FS: RNFS,
        filePath: pathConst.logPath,
        fileName: `error-log-{date-today}.log`,
    },
    dateFormat: 'local',
};

const traceConfig = {
    transport: fileAsyncTransport,
    transportOptions: {
        FS: RNFS,
        filePath: pathConst.logPath,
        fileName: `trace-log.log`,
    },
    dateFormat: 'local',
};

const log = logger.createLogger(config);
const traceLogger = logger.createLogger(traceConfig);

export function trace(
    desc: string,
    message?: any,
    level: 'info' | 'error' = 'info',
) {
    if (__DEV__) {
        console.log(desc, message);
    }
    // 特殊情况记录操作路径
    if (Config.get('setting.basic.debug.traceLog')) {
        traceLogger[level]({
            desc,
            message,
        });
    }
}

export function errorLog(desc: string, message: any) {
    if (Config.get('setting.basic.debug.errorLog')) {
        log.error({
            desc,
            message,
        });
        trace(desc, message, 'error');
    }
}

export function devLog(
    method: 'log' | 'error' | 'warn' | 'info',
    ...args: any[]
) {
    if (Config.get('setting.basic.debug.devLog')) {
        addLog(method, args);
    }
}

export {log};
