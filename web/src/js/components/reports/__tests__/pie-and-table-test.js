import React from 'react';
import { shallow } from 'enzyme';
import PieAndTable from '../pie-and-table';
import D3PieChart from '../d3-pie-chart';
import CategoryTotalRow from '../category-total-row';
import SubcategoryTotalRow from '../subcategory-total-row';
import ReportTotalRow from '../report-total-row';

describe('PieAndTable', () => {
  describe('render', () => {
    let pieAndTable;
    const tableData = {
      total: 500,
      rows: [
        { type: 'category', categoryId: 45, name: 'My Category', amount: 1000 },
        { type: 'subcategory', subcategoryId: 12, categoryId: 45, name: 'My Subcategory', amount: 5000 },
      ],
    };
    const pieChartData = { total: 500, data: [500], labels: ['One'] };

    beforeEach(() => {
      pieAndTable = shallow(<PieAndTable loaded title="income" tableData={tableData} pieChartData={pieChartData}/>);
    });

    it('has a page header', () => {
      const title = pieAndTable.childAt(0);

      expect(title.type()).toEqual('h3');
      expect(title.text()).toEqual('income');
    });

    it('has a table with d3 pie chart, category, subcategory and total rows', () => {
      const table = pieAndTable.childAt(1);
      expect(table.type()).toEqual('table');

      const firstRow = table.find('tr').first().find(D3PieChart);
      expect(firstRow.prop('id')).toEqual('income');
      expect(firstRow.prop('data')).toEqual([500]);
      expect(firstRow.prop('labels')).toEqual(['One']);

      const secondRow = table.find(CategoryTotalRow);
      expect(secondRow.prop('name')).toEqual('My Category');

      const thirdRow = table.find(SubcategoryTotalRow);
      expect(thirdRow.prop('name')).toEqual('My Subcategory');

      const fourthRow = table.find(ReportTotalRow);
      expect(fourthRow.prop('amount')).toEqual(500);
    });
  });
});
