chai.should();
 
describe('Ajax test', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
 
    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });
 
  afterEach(function() {
    this.xhr.restore();
  });
  //Tests go here
  it('should fetched data as specific city', function(done) {
    const testData = {
      "coord": {
        "lon": -74.01,
        "lat": 40.71
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 8.13,
        "feels_like": 6.4,
        "temp_min": 6.11,
        "temp_max": 10,
        "pressure": 1002,
        "humidity": 93
      },
      "visibility": 16093,
      "wind": {
        "speed": 1.5,
        "deg": 290
      },
      "clouds": {
        "all": 1
      },
      "dt": 1586423414,
      "sys": {
        "type": 1,
        "id": 4610,
        "country": "US",
        "sunrise": 1586427937,
        "sunset": 1586474932
      },
      "timezone": -14400,
      "id": 5128581,
      "name": "New York",
      "cod": 200
    }
     
    AjaxApi.get(function(err, result) {
      result.should.deep.equal(testData);
      done();
    });
    this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify(testData));
  });

  it('should return error into callback', function(done) {
    AjaxApi.get(function(err, result) {
        err.should.exist;
        done();
    });

    this.requests[0].respond(500);
});
  });