import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
   name: 'FilePath',
   standalone: true
})
export class FilePathPipe implements PipeTransform {

   constructor(private sanitizer: DomSanitizer) { }
   
   transform(file: string, type: string): SafeUrl {
      let imageURL: string = file;
      switch (type) {
         case 'img':
            imageURL = 'assets/images/' + file;
            break;
         case 'icon':
            imageURL = 'assets/icons/' + file;
            break;
         default:
            imageURL = file;
      }
      return this.sanitizer.bypassSecurityTrustUrl(imageURL);
   }
   
}
