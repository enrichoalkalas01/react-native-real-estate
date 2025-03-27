import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: "com.crapperinside.reestate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABSE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL("/auth-callback");

        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );

        if (!response) throw new Error("Failed to initiate OAuth");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );

        if (browserResult.type !== "success") throw new Error("OAuth failed");

        // Ambil token dan userId dari callback URL
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret");
        const userId = url.searchParams.get("userId");

        if (!secret || !userId) throw new Error("Missing OAuth data");

        // Buat sesi baru di Appwrite
        const session = await account.createSession(userId, secret);

        if (!session) throw new Error("Failed to create session");

        return session;
    } catch (error) {
        console.error("Login Error:", error);
        return null;
    }
}

export async function logout() {
    try {
        await account.deleteSession("current");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const session = await account.getSession("current");
        if (!session) return null;

        const response = await account.get();
        if (response?.$id) {
            return {
                ...response,
                avatar: avatar.getInitials(response.name).toString(),
            };
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function checkSession() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}

export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            `${config.databaseId}`,
            `${config.propertiesCollectionId}`,
            [
                Query.orderAsc("$createdAt"),
                Query.limit(5),
            ]
        )

        return result.documents
    } catch (error) {
        return []
    }
}

export async function getListProperties({ filter, query, limit }: {
    filter: string;
    query: string;
    limit: number;
}) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')]

        if ( filter && filter !== "All" ) {
            buildQuery.push(Query.equal('type', filter))
        }

        if ( query ) {
            buildQuery.push(Query.or([
                Query.search('name', query),
                Query.search('address', query),
                Query.search('type', query)
            ]))
        }

        if ( limit ) {
            buildQuery.push(Query.limit(limit))
        }
        
        const result = await databases.listDocuments(
            `${config.databaseId}`,
            `${config.propertiesCollectionId}`,
            buildQuery,
        )

        return result.documents
    } catch (error) {
        return []
    }
}

export async function getPropertyById({ id }: { id: string; }) {
    try {
        const result = await databases.getDocument(
            `${config.databaseId}`,
            `${config.propertiesCollectionId}`,
            id,
        )

        return result
    } catch (error) {
        return null
    }
}