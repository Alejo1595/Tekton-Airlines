export const generateID = () => {
    const random = Math.random().toString(36).slice(2);
    const date = Date.now().toString(36);
    return random + date;
};