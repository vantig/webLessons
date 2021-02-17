class Publication {
    constructor(date, text, title) {
        this.datePublication = date;
        this.text = text;
        this.title = title;
    }

    print = () => {
        let p = document.createElement('p');
        p.className = "output_container";
        let currentDate = new Date();
        if (currentDate.setDate(currentDate.getDate() - 7) > this.datePublication) {
            p.innerHTML = `Date N\n`;
        } else {

            p.innerHTML = `Date ${this.datePublication}\n`;
        }
        p.innerHTML += `Text ${this.text} Title ${this.title}`;
        let body = document.querySelector('body');
        body.append(p);
    }
}


