export default function timeParser(total) {

    let hours = Math.floor(total / 3600);
    let minutes = Math.floor((total - (hours * 3600)) / 60);
    let seconds = total - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}