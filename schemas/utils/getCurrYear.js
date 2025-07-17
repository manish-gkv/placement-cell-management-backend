export default function getCurrAcademicYear() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 7) {
        return currentYear+1;
    } else {
        return currentYear;
    }
}