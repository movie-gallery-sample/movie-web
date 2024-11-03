export const convertPathToUrl = (path: string | undefined) => {
    if (!path) return '';

    const urlSegments = path.split("/");
    const imageUrl = urlSegments
        ? process.env.NEXT_PUBLIC_API_IMAGE +
        urlSegments[urlSegments.length - 1]
        : "";

    return imageUrl;
}