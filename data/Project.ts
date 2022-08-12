export class Project {
    name: String;
    date: String;
    youtube: String;
    soundcloud: String;

    public constructor(name: String, dateString: string, youtube: String, soundcloud: String) {
        this.name = name;
        const date = new Date(dateString);
        this.date = this.GetDateString(date);
        this.youtube = this.formatYoutubeHTML(youtube);
        this.soundcloud = soundcloud;
    }

    private formatYoutubeHTML(html: String): String {
        if (html.indexOf('<iframe') > -1) {
            if (html.indexOf('width') > -1) {
                html = html.replace(new RegExp('width="[a-zA-Z0-9._-]*"'), 'width="100%"');
            } else {
                html = html.replace('<iframe', '<iframe width="100%" ');
            }

            if (html.indexOf('height') > -1) {
                html = html.replace(new RegExp('height="[a-zA-Z0-9._-]*"'), 'height="100%"');
            } else {
                html = html.replace('<iframe', '<iframe height="100%" ');
            }

            if (html.indexOf('aspect-ratio') > -1) {
                html = html.replace(new RegExp('aspect-ratio="[a-zA-Z0-9._-]*"'), 'aspect-ratio="16/9"');
            } else {
                html = html.replace('<iframe', '<iframe aspect-ratio="16/9" ');
            }
        }
        return html;
    }

    private GetDateString(date: Date): String {
        return ('0' + date.getDate()).slice(-2) + '/'
        + ('0' + (date.getMonth()+1)).slice(-2) + '/'
        + date.getFullYear().toString().slice(-2);
    }
}

export interface IProject {
    name: String;
    date: String;
    youtube: String;
    soundcloud: String;
}

export interface IProjectContainer {
    projects: IProject[];   
}
