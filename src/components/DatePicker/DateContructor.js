class Day {
    constructor(date=null, lang='default'){
        data = data ?? new Date();

        this.Date = date;
        this.date = date.getDate();
        this.day = date.toLocalString(lang, {weekday: 'long'})
        this.
    }
}