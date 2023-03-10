import { LightningElement, track, api, wire} from 'lwc';
import { getPicklistValues, getObjectInfo } from "lightning/uiObjectInfoApi";

import createMovie from "@salesforce/apex/MovieController.createMovie";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import MOVIE_OBJECT from "@salesforce/schema/Movie__c";
import TYPE_FIELD from "@salesforce/schema/Movie__c.type__c";

 
export default class NewMovieModalLWC extends LightningElement {

        recordId;
        movieId;
        isModalOpen;
        searchQuery = '';
        @wire(getObjectInfo, { objectApiName: MOVIE_OBJECT })
        movieMetadata;
        @wire(getPicklistValues, {
            recordTypeId: "$movieMetadata.data.defaultRecordTypeId",
            fieldApiName: TYPE_FIELD
          })
        picklistValues;
        @track
        movie = {
          Name__c: "",
          type__c: "",
          Description__c: "",
          rating__c: 0,
          imageUrl__c: ""
        };
        
        @api
        get movieCreated() {
          return this.movie;
        }
      
        set movieCreated(value) {
          this.movie = value;
        }

        @api
        show() {
          this.isModalOpen = true;
        }
        handleModalClose(){
            this.isModalOpen = false;
        }

        handleImageUrl(event) {
            this.movie.imageUrl__c = event.target.value;
         }
         handleRatingClick(event) {
            this.movie.rating__c = event.detail;
        }
        handleTypeChange(event) {
            this.movie.type__c = event.target.value;
        }

        handleNameChange(event) {
            this.movie.Name__c = event.target.value;
        }
        handleDescriptionChange(event) {
            this.movie.Description__c = event.target.value;   
        }
        
 
        handleSave() {
              let actors = this.template.querySelector("c-actors").actors;
              createMovie({
                movie: this.movie,
                actorsIds: actors,
              })
                .then(() => {
                  this.showModal = false;
                  let event = new ShowToastEvent({
                    message: "Hi there! the movie was created"
                  });
                  this.dispatchEvent(event);
                })
                .catch((error) => {
                  let event = new ShowToastEvent({
                    message: "Ooops an error occured" + JSON.stringify(error)
                  });
                  this.dispatchEvent(event);
                });
            }
          }
 