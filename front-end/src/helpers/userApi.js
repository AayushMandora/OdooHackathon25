import { get, post } from "./apiHelper";

export const getProfile = async () => {
    const response = await get("/user/me");
    return response;
}

export const login = async (email, password) => {
    const response = await post("/user/login", { email, password });
    return response;
}

export const register = async (name, email, password) => {
    const response = await post("/user/register", { name, email, password });
    return response;
}

export const getUsers = async ({ page = 1, limit = 10, search = "" }) => {
    const query = new URLSearchParams({ page, limit, search });
    const response = await get(`/user?${query.toString()}`);
    return response;
}

export const updateProfile = async (id, formData) => {
    const response = await put(`/user/${id}`, formData);
    return response;
}