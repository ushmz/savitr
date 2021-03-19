import axios from "axios"

const API_ENDPOINT = 'http://localhost:8080/v1';

export type TaskInfo = {
	query: string,
        title: string,
        description: string,
        authorId: string,
        searchUrl: string,
        "type": string
}

export const fetchTaskInfo = async (taskId: number): Promise<TaskInfo|undefined> => {
	const response = await axios.get(`${API_ENDPOINT}/savitr/tasks/${taskId}`);

	if (response.status === 200) {
		return response.data[0] as TaskInfo;
	} else {
		console.log("Error fetch error.");
		return;
	}
} 

export type LeakedPage = {
	id: string,
	title: string,
	url: string,
	thumb: string,
	cookies: {
		"String": string,
		Valid: boolean
	}
}

export type Serp = {
	id: string,
        title: string,
        url: string,
        snippet: string,
        cookies: string[],
	leaks: LeakedPage[]
}

export const fetchSerp = async (taskId: number): Promise<Serp[]> => {
	const response = await axios.get(`${API_ENDPOINT}/savitr/serps/${taskId}`);

	if (response.status === 200) {
		return response.data as Serp[];
	} else {
		console.log("Error fetch error.");
		return [];
	}
} 

