public with sharing class MovieController {

    @AuraEnabled
    public static void createMovie(Movie__c movie, List<String> actorsIds) {
      String userId = UserInfo.getUserId();
      if (movie != null) {
        insert movie;
        List<MovieActor__c> moviesActors = new List<MovieActor__c>();
        for (String actorId : actorsIds) {
          MovieActor__c movieActor = new MovieActor__c(
            Actor__c = actorId,
            Movie__c = movie.Id
          );
          moviesActors.add(movieActor);
        }
        if (!moviesActors.isEmpty()) {
         insert moviesActors;
        }
      }
    }

    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getMovies(String movieSearchName) {
        String searchCriteria = '%'+ movieSearchName + '%';
        List<Movie__c> movies = [SELECT Id,imageUrl__c, Name__c,type__c, rating__c 
        FROM Movie__c where Name__c  LIKE :searchCriteria];
        return movies;

    }

}