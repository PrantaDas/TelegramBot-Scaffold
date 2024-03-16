import { connect, set } from 'mongoose';

export default function connectToMongoDB(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // Set mongoose properties
        set('strictQuery', true);

        // Connect
        connect(process.env.MONGODB_URL!, {
            keepAlive: true,
            loggerLevel: 'debug'
        }, (err: any) => {
            if (err) { reject(err); }
            resolve('Connected to MongoDB');
        });
    });
}
