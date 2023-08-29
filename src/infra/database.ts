import mongoose, { ConnectOptions } from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb+srv://nenaskitchen:OYVmSu4cp2kuGnaB@cluster0.agncpdt.mongodb.net/nenaskitchen', { useNewUrlParser: true } as ConnectOptions);
        console.log('Database connect success');

    } catch (error) {
        console.log("🚀 ~ file: database.ts:9 ~ connect ~ error:", error)
    }
}