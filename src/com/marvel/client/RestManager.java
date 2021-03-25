package com.marvel.client;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;



public class RestManager {

    public static String serverUrl = "http://localhost:4000";


    public static void main(String[] args) throws Exception {

        //JSONObject json = register("test", "1977-11-18", "ben.subercseaux@gmail.com");
        //JSONObject json = profile("fb316ce0-8da6-11eb-86c2-5547f63e5e04");
        //JSONObject json = buyCard("fb316ce0-8da6-11eb-86c2-5547f63e5e04");
        //JSONObject json = battle("fb316ce0-8da6-11eb-86c2-5547f63e5e04", "skill");
        JSONArray json = getCards("fb316ce0-8da6-11eb-86c2-5547f63e5e04");
        System.out.println(json.toString());

    }


    public static JSONObject register(String username, String birthdate, String email) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();

        HttpPost request = new HttpPost(
                serverUrl + "/register");
        request.addHeader("accept", "application/json");

        JSONObject body = new JSONObject();
        body.put("username", username);
        body.put("birthdate", birthdate);
        body.put("email", email);

        StringEntity se = new StringEntity(body.toString(), "UTF-8");
        se.setContentType("application/json");
        request.setEntity(se);

        JSONObject json = executeRequest(httpClient, request);

        httpClient.getConnectionManager().shutdown();

        return json;

    }

    public static JSONObject profile(String playerID) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();

        HttpGet request = new HttpGet(
                serverUrl + "/profile");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONObject json = executeRequest(httpClient, request);

        httpClient.getConnectionManager().shutdown();

        return json;

    }

    public static JSONObject buyCard(String playerID) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();

        HttpGet request = new HttpGet(
                serverUrl + "/buy-card");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONObject json = executeRequest(httpClient, request);

        httpClient.getConnectionManager().shutdown();

        return json;

    }

    public static JSONObject nextCard(String playerID) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();

        HttpGet request = new HttpGet(
                serverUrl + "/next-card");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONObject json = executeRequest(httpClient, request);

        httpClient.getConnectionManager().shutdown();

        return json;

    }

    public static JSONObject battle(String playerID, String battleField) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();

        HttpPost request = new HttpPost(
                serverUrl + "/battle");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONObject body = new JSONObject();
        body.put("battlefield", battleField);

        StringEntity se = new StringEntity(body.toString(), "UTF-8");
        se.setContentType("application/json");
        request.setEntity(se);

        JSONObject json = executeRequest(httpClient, request);

        httpClient.getConnectionManager().shutdown();

        return json;

    }

    public static JSONArray getCards(String playerID) throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();

        HttpGet request = new HttpGet(
                serverUrl + "/cards");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONArray json = executeRequestArray(httpClient, request);

        httpClient.getConnectionManager().shutdown();

        return json;

    }

    public static JSONObject executeRequest(DefaultHttpClient httpClient, HttpUriRequest request) throws Exception {
        HttpResponse response = httpClient.execute(request);

        try {

            String output = EntityUtils.toString(response.getEntity(), "UTF-8");
            JSONObject json = (JSONObject) JSONSerializer.toJSON(output);

            return json;
        } finally {
            EntityUtils.consume(response.getEntity());
        }

    }

    public static JSONArray executeRequestArray(DefaultHttpClient httpClient, HttpUriRequest request) throws Exception {
        HttpResponse response = httpClient.execute(request);

        try {

            String output = EntityUtils.toString(response.getEntity(), "UTF-8");
            JSONArray json = (JSONArray) JSONSerializer.toJSON(output);

            return json;
        } finally {
            EntityUtils.consume(response.getEntity());
        }

    }



}
