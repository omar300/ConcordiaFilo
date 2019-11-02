import { Component, OnInit, Injectable, Input } from "@angular/core";
import { UploadFileService } from "../upload/upload-file.service";
import { ProfilePage } from "../profile/profile.page";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../store/store';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { FileUpload } from './fileupload';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-course-front",
  templateUrl: "./course-front.page.html",
  styleUrls: ["./course-front.page.scss"],
})
export class CourseFrontPage {

  course: any;

  constructor(
    private content: UploadFileService,
    private profilepage: ProfilePage,
    private readonly _store: Store,
    private db: AngularFireDatabase, private storage: AngularFireStorage
  ) {
   // debugger;
    this.course = this._store.course;

    //course.name

    //upload-file.service is where all the needed code is. get .ts code from there and find the html code from component
    
 
 
 

    
 
  }

  private basePath = '/uploads';

  
    pushFileToStorage(fileUpload: FileUpload): Observable<number> {
      const filePath = `${this.basePath}/${fileUpload.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      ).subscribe();
  
      return uploadTask.percentageChanges();
    }
  
    private saveFileData(fileUpload: FileUpload) {
      this.db.list(this.basePath).push(fileUpload);
    }
  
    getFileUploads(numberItems): AngularFireList<FileUpload> {
      return this.db.list(this.basePath, ref =>
        ref.limitToLast(numberItems));
    }
  
    deleteFileUpload(fileUpload: FileUpload) {
      this.deleteFileDatabase(fileUpload.key)
        .then(() => {
          this.deleteFileStorage(fileUpload.name);
        })
        .catch(error => console.log(error));
    }
  
    private deleteFileDatabase(key: string) {
      return this.db.list(this.basePath).remove(key);
    }
  
    private deleteFileStorage(name: string) {
      const storageRef = this.storage.ref(this.basePath);
      storageRef.child(name).delete();
    }
 
}