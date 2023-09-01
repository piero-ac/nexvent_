import { Client, Account } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "YOU PROJECT ID HERE";

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("64e3a2385e7b323e2a69");

export const account = new Account(client);

export default client;
