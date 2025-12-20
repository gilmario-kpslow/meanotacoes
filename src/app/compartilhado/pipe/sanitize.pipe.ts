import { inject, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'sanitizePipe',
    standalone: true
})
export class SanitizePipe implements PipeTransform {

    private sanitized: DomSanitizer = inject(DomSanitizer);

    transform(value: any, ...args: any[]) {
        if (!value) {
            return;
        }

        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}