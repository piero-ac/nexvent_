import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_SERVER)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const NEXVENT_DB_ID = "64f10ba63cc6da0ecf53";
export const NEXVENT_EVENTS_COL_ID = "64f256d14f42950aedb6";
export const NEXVENT_BUCKET_ID = "64f4d34b15ae78bb3191";
export const db = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export default client;
