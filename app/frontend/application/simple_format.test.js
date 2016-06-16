import simpleFormat from "./simple_format";

describe("simpleFormat", function () {
  it("should escape HTML entities", function () {
    var content = "Trying to inject <html />";
    expect(simpleFormat(content)).to.equal("Trying to inject &#x3C;html /&#x3E;");
  });

  it("should autoLink", function () {
    var content = "Linking https://decidim.barcelona is good linking.";
    expect(simpleFormat(content)).to.include('href="https://decidim.barcelona"');
  });
});
