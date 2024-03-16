import { Logger } from 'tslog';
import { createStream } from "rotating-file-stream";

const stream = createStream("tg-boilerplate.log", {
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    compress: "gzip", // compress rotated files
});

const log = new Logger({
    name: 'Tg-boilerplate',
    type: 'pretty',
    prettyLogTimeZone: 'local',
    minLevel: 0,
    attachedTransports: [(logObj) => {
        stream.write(JSON.stringify(logObj) + "\n");
    }]
});

export default log;
