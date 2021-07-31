public with sharing class opportunityController {
    @AuraEnabled(cacheable=true)
    public static list<Opportunity> getOpportunities(){
        return [select StageName from Opportunity];
    }
}
