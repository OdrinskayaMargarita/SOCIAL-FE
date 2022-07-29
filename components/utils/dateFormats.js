import moment from "moment";

const dateFormat = (date, format = "LLLL") => moment(date).format(format);

export default dateFormat;
