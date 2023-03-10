public with sharing class ActorsController {
    @AuraEnabled(cacheable=true)
    public static List<Actor__c> getActors(){
        return [SELECT ID, Name__c FROM Actor__c];
    }
}