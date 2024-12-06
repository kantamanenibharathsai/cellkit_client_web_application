export const formatPath = (path: string) => {
    const lastSegment = path.substring(path.lastIndexOf("/") + 1);
    return lastSegment;
};