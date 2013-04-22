package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result recentTrips() {
        return ok(recentTrips.render("Your new application is ready."));
    }

    public static Result upcomingTrips() {
        return ok(upcomingTrips.render("Your new application is ready."));
    }

    public static Result planTrip() {
        return ok(planTrip.render());
    }

}
