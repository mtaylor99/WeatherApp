/* global beforeEach describe it expect GetDayOfWeek */

describe("Weather App - Charts", function() {
    beforeEach(function() {
       
    });

    it("Day of week \"Sunday\" is correct", function() {
        var dayOfWeek = GetDayOfWeek(1551571200);

        expect(dayOfWeek === "Sun").toBe(true);
    });

    it("Day of week \"Monday\" is correct", function() {
        var dayOfWeek = GetDayOfWeek(1543795200);

        expect(dayOfWeek === "Mon").toBe(true);
    });

    it("Day of week \"Tuesday\" is correct", function() {
        var dayOfWeek = GetDayOfWeek(1536044400);

        expect(dayOfWeek === "Tue").toBe(true);
    });


    it("Day of week \"Wednesday\" is correct", function() {
        var dayOfWeek = GetDayOfWeek(1538550000);

        expect(dayOfWeek === "Wed").toBe(true);
    });



    it("Day of week \"Thursday\" is correct", function() {
        var dayOfWeek = GetDayOfWeek(1546473600);

        expect(dayOfWeek === "Thu").toBe(true);
    });

    it("Day of week \"Friday\" is correct", function() {
        var dayOfWeek = GetDayOfWeek(1556841600);

        expect(dayOfWeek === "Fri").toBe(true);
    });

    it("Day of week \"Saturday\" is correct", function() {
        var dayOfWeek = GetDayOfWeek(1541203200);

        expect(dayOfWeek === "Sat").toBe(true);
    });
});