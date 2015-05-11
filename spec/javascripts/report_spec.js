describe('d3ReportsPieChart', function(){
  var view, selector, sums, labels, report;
  beforeEach(function(){
    sums = [2000, 3000, 5000];
    labels = ['Category 1', 'Category 2', 'Category 3'];
    pie_chart(sums, labels, 'body');
  });
  afterEach(function(){
    d3.selectAll('svg').remove();
  });

  describe('the svg' ,function() {
    it('should be created', function() {
        expect(getSvg()).not.toBeNull();
    });

    it('should have the correct height', function() {
      expect(getSvg().attr('height')).toBe('350');
    });

    it('should have the correct width', function() {
      expect(getSvg().attr('width')).toBe('500');
    });
  });

  describe('totals', function(){
    it('displays total value', function(){
      var centerGroup = d3.select('g.center_group');
      expect(centerGroup.select('circle')).toBeDefined();

      var centerText = centerGroup.selectAll('text')[0];
      expect(centerText[0]).toContainText('TOTAL');
      expect(centerText[1]).toContainText('$100');
    });
  });

  describe('arcs', function(){
    it('has arcs for each data element', function(){
      var arcs = d3.selectAll('g.arc');
      expect(arcs[0].length).toEqual(3);

      var arcText = arcs.selectAll('text');
      expect(arcText[0][0]).toContainText('$20');
      expect(arcText[0][1]).toContainText('Category 1');
      expect(arcText[1][0]).toContainText('$30');
      expect(arcText[1][1]).toContainText('Category 2');
      expect(arcText[2][0]).toContainText('$50');
      expect(arcText[2][1]).toContainText('Category 3');
    });
  });
});

function getSvg() {
  return d3.select('svg');
}