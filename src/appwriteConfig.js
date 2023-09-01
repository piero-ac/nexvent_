import { Client, Account, Databases } from "appwrite";

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_SERVER)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const db = new Databases(Client);

export const account = new Account(client);

export default client;
