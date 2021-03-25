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
        DefaultHttpClient httpClient = new DefaultHttpClient();
          //JSONObject json = ping(httpClient);
        //JSONObject json = register("testuser3344", "1999-11-18", "test@gmail.com",httpClient);
        //JSONObject json = profile("fb316ce0-8da6-11eb-86c2-5547f63e5e044",httpClient);
        //JSONObject json = buyCard("fb316ce0-8da6-11eb-86c2-5547f63e5e043",httpClient);
        //JSONObject json = nextCard("fb316ce0-8da6-11eb-86c2-5547f63e5e04",httpClient);
        //JSONObject json = battle("fb316ce0-8da6-11eb-86c2-5547f63e5e044", "skill",httpClient);
        JSONArray json = getCards("fb316ce0-8da6-11eb-86c2-5547f63e5e04",httpClient);
        System.out.println(json.toString());
        httpClient.getConnectionManager().shutdown();

    }


    public static JSONObject ping(DefaultHttpClient httpClient) throws Exception {


        HttpGet request = new HttpGet(
                serverUrl + "/ping");
        request.addHeader("accept", "application/json");

        JSONObject json = executeRequest(httpClient, request);



        return json;

    }

    public static JSONObject register(String username, String birthdate, String email, DefaultHttpClient httpClient) throws Exception {


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


        return json;

    }

    public static JSONObject profile(String playerID, DefaultHttpClient httpClient) throws Exception {

        HttpGet request = new HttpGet(
                serverUrl + "/profile");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONObject json = executeRequest(httpClient, request);

        return json;

    }

    public static JSONObject buyCard(String playerID, DefaultHttpClient httpClient) throws Exception {

        HttpGet request = new HttpGet(
                serverUrl + "/buy-card");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONObject json = executeRequest(httpClient, request);

        return json;

    }

    public static JSONObject nextCard(String playerID, DefaultHttpClient httpClient) throws Exception {

        HttpGet request = new HttpGet(
                serverUrl + "/next-card");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONObject json = executeRequest(httpClient, request);

        return json;

    }

    public static JSONObject battle(String playerID, String battleField, DefaultHttpClient httpClient) throws Exception {

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

        return json;

    }

    public static JSONArray getCards(String playerID, DefaultHttpClient httpClient) throws Exception {

        HttpGet request = new HttpGet(
                serverUrl + "/cards");
        request.addHeader("accept", "application/json");
        request.addHeader("playerid", playerID);

        JSONArray json = executeRequestArray(httpClient, request);

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
