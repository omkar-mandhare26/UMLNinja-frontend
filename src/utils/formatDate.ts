const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    const formattedDate = date
        .toLocaleDateString("en-GB", options)
        .replace(/\//g, "/");

    return formattedDate;
};

export default formatDate;
