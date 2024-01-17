import $ from 'jquery';
import 'datatables.net-responsive-dt';

function Customer(name, company, phoneNumber, email, country, status) {
  this['Customer Name'] = name;
  this.Company = company;
  this['Phone Number'] = phoneNumber;
  this.Email = email;
  this.Country = country;
  this.Status = status;
};

export const init = () => {
  const customersData = [];

  for (let i = 0; i < 40; i++) {
    customersData.push(new Customer(
      'Jane Cooper',
      'Microsoft',
      '(225) 555-0118',
      'jane@microsoft.com',
      'United States',
      Math.random() >= 0.5 ? 1 : 0
    ));
    customersData.push(new Customer(
      'Floyd Miles',
      'Yahoo',
      '(205) 555-0100',
      'floyd@yahoo.com',
      'Kiribati',
      Math.random() >= 0.5 ? 1 : 0
    ));
    customersData.push(new Customer(
      'Ronald Richards',
      'Adobe',
      '(302) 555-0107',
      'ronald@adobe.com',
      'Israel',
      Math.random() >= 0.5 ? 1 : 0
    ));
    customersData.push(new Customer(
      'Marvin McKinney',
      'Tesla',
      '(252) 555-0126',
      'marvin@tesla.com',
      'Iran',
      Math.random() >= 0.5 ? 1 : 0
    ));
    customersData.push(new Customer(
      'Jerome Bell',
      'Google',
      '(629) 555-0129',
      'jerome@google.com',
      'Réunion',
      Math.random() >= 0.5 ? 1 : 0
    ));
    customersData.push(new Customer(
      'Kathryn Murphy',
      'Microsoft',
      '(406) 555-0120',
      'kathryn@microsoft.com',
      'Curaçao',
      Math.random() >= 0.5 ? 1 : 0
    ));
    customersData.push(new Customer(
      'Jacob Jones',
      'Yahoo',
      '(208) 555-0112',
      'jacob@yahoo.com',
      'Brazil',
      Math.random() >= 0.5 ? 1 : 0
    ));
    customersData.push(new Customer(
      'Kristin Watson',
      'Facebook',
      '(704) 555-0127',
      'kristin@facebook.com',
      'Åland Islands',
      Math.random() >= 0.5 ? 1 : 0
    ));
  }

  const createTableHeading = (name, statusName = '') => (
    `
    <div class="table-heading">
      <div class="table-heading__text">${name}</div>
      ${statusName ?
      `
        <div class="table-heading__status">
          ${statusName}
        </div>
      `
      : ''
    }
    </div>
    `
  );

  $('#customer-table').DataTable({
    columns: [
      { data: 'Customer Name' },
      { data: 'Company' },
      { data: 'Phone Number' },
      { data: 'Email' },
      { data: 'Country' },
      {
        data: 'Status',
        render(data, type, row, meta) {
          return `
          <div class="customers-table__b-cell-status ${data === 1 ? 'customers-table__b-cell-status--active' : 'customers-table__b-cell-status--inactive'}">
            ${data === 1 ? 'Active' : 'Inactive'}
          </div>
          `;
        },
      },
    ],
    data: customersData,
    pageLength: 8,
    lengthChange: false,
    ordering: false,
    responsive: true,
    scrollX: '100%',

    // Callbacks (hooks)
    infoCallback(settings, start, end, max, total, pre) {
      const formatter = Intl.NumberFormat('en', { notation: 'compact' });
      return `Showing data ${start} to ${end} of ${formatter.format(total)} entries`;
    },
    initComplete() {
      $('#customer-table_wrapper').prepend(createTableHeading('All Customers', 'Active Members'));

      const searchLabel = $('#customer-table_filter > label');
      const searchInput = $('#customer-table_filter > label > input[type="search"]');

      // remove all text
      const selectedElement = searchLabel.contents();
      const textNodes = selectedElement.filter(function () {
        return this.nodeType === Node.TEXT_NODE;
      });
      textNodes.remove();

      if (searchInput) {
        searchInput.attr('placeholder', 'Search');
      }

      searchLabel.prepend(`
        <svg class="icon icon-search">
          <use xlink:href="images/icons/icons.svg#search"></use>
        </svg>
      `);
    },
    drawCallback() {
      const previousBtn = $('.paginate_button.previous')[0];
      const nextBtn = $('.paginate_button.next')[0];

      $('#customer-table_paginate').addClass('pagination-table')

      previousBtn.innerHTML = `
        <svg class="icon pagination-table__arrow pagination-table__arrow-prev">
          <use xlink:href="images/icons/icons.svg#arrow"></use>
        </svg>
      `;
      nextBtn.innerHTML = `
        <svg class="icon pagination-table__arrow">
          <use xlink:href="images/icons/icons.svg#arrow"></use>
        </svg>
      `;
    },
  });
}
