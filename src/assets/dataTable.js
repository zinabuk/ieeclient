<template>
  <div class="w-full flex  flex-col justify-center mx-auto overflow-auto  ">
    <div class="flex flex-col  justify-center mx-auto">
      <div class="flex flex-row justify-between  ">
        <div class="w-1/4 ">
        <BaseSelect1
            :options="size"
            v-model="pageSize"
            @change="handlePageSizeChange(pageSize)"
        />
      </div>
      <div class="w-1/4 flex  flex-inline">
        <BaseInput
          v-model="filterKey"
          id="searchId"
          @input="handleGoToFirstPage"        
          placeholder="search for items"
        />
        <BaseButton
            label="filter"
            class="px-5 "
            icon="filter"
            type="bg-blue-500/70"
            @click="openFiltersSelector"
          />
      </div>
      </div>
      <div class="border-b border-gray-200 shadow mt-2">
        <table id="custom-table" class="custom-table divide-y divide-green-400 ">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-2 text-xs text-gray-500 "
               v-for=" (key,i) in headers" :key='i' @click="sortBy(key.key)" >
                <div  class="text-left p-2 capitalize font-normal">
                  {{ key.key }}
                  <span v-if="sortDirection == 'asc' && sortByColumn ==key.key">&#x25B2;</span>
                  <span v-if="sortDirection == 'desc' && sortByColumn == key.key">&#x25BC;</span>
                  <span v-if="sortDirection == 'asc' && sortByColumn !=key.key" class="text-gray-300">&#x25B2;</span>
                  <span v-if="sortDirection == 'desc' && sortByColumn != key.key" class="text-gray-300">&#x25BC;</span>
                </div>
              </th>
              <th class="p-2 text-xs text-gray-500">
                actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-300">
            <template v-if="filteredItems.length > 0">
              <tr v-for="(item, i) in pagedItems" :key="i" class="whitespace-nowrap hover:bg-gray-200 bg-white odd:bg-[#f1f1f1]
             odd:text-[#42526E]">
                <td class="p-3 text-sm text-gray-500 cursor-pointer
                group-hover:bg-[#007fff] group-hover:text-white" v-for="( key ) in headers" :key="key">
                  {{ item[i, key.key] }}
                </td>
                <td class=" py-3">
                  <div class="flex space-x-3 justify-start items-center">
                    <div class="flex space-x-2 shadow-sm cursor-pointer hover:opacity-75"
                      v-for="(action, index) in actions" :key="index" @click="action.action(item)">
                      <Icon :name="action.icon" :size="20" />
                      <!-- <p>{{ action.label }}</p> -->
                    </div>

                  </div>
                </td>
                <!-- <td class="px-6 py-4">
                <a href="#">
                  <Icon name="delete" :size="20" />
                </a>
              </td> -->
              </tr>
            </template>
            <tr v-else>
              <td :colspan="headers.length">

                <div>No Data Available</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center mx-auto">
        <div class="mt-1 " v-if="this.currentPage>0 && this.currentPage<this.totalPages && this.filterKey==''">Showing {{ (currentPage-1)*pageSize +1 }} to
          {{ currentPage*pageSize }} of {{ filteredItems.length }} items</div>
        
        <div class="mt-1" v-if="this.currentPage>0 && this.currentPage==this.totalPages &&this.filterKey==''">Showing {{ (currentPage-1)*pageSize +1 }} to
          {{ filteredItems.length}} of {{ Items.length }} items</div>

          <div class="mt-1 " v-if="this.currentPage>0 && this.currentPage<this.totalPages && 
        this.filterKey!=''">Showing {{ (currentPage-1)*pageSize +1 }} to
          {{ currentPage*pageSize }} of {{ filteredItems.length }} items filtered from{{ Items.length }} total items</div>
      
        <div class="mt-1" v-if="this.currentPage>0 && this.currentPage==this.totalPages
          &&this.filterKey!=''">Showing {{ (currentPage-1)*pageSize +1 }} to
          {{ filteredItems.length}} of {{ filteredItems.length }} items filtered from {{ Items.length }} total items</div>

        <Pagination
        v-if="filteredItems.length > 0"
          :currentPage="currentPage" 
          :totalPages="totalPages"
          @changepage="handlePageChange"
            /> 
      </div>
    </div>
</div>
</template>
<script>
import eventBus from "@/event.js"
import Icon from "@/components/shared/Icon/Icon.vue"
import BaseInput from "@/components/base/BaseInput.vue"
import Pagination from "@/components/pagination/pagination.vue"
import BaseSelect1 from "@/components/base/BaseSelect1.vue"
import BaseButton from "@/components/base/BaseButton.vue"

export default {
  components: { Icon, BaseInput, Pagination,BaseSelect1,BaseButton },
  props:{
  headers: Array,
  Items: Array,
  actions: String
  },
  data() {
    return {
      filterKey: "",
      currentPage: 1,
      pageSize: 10,
      size:[5,10,25,50],
      sortByColumn: null,
    sortDirection: 'asc',
    filters: [this.headers[0].key],
    processing:false

    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredItems.length / Number(this.pageSize));
    },
    filteredItems() {
      let filteredData = this.Items;

    if (this.filterKey) {
      const searchTerm = this.filterKey.toLowerCase();
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }

    if (this.sortByColumn) {
      filteredData = filteredData.slice().sort((a, b) => {
        //two types of sort default in asc only and custom sort using compare function
        //https://www.freecodecamp.org/news/how-does-the-javascript-sort-function-work/
        const aValue = a[this.sortByColumn];
        const bValue = b[this.sortByColumn];

        if (this.sortDirection === 'asc') {
          //compares two strings in the current locale.
          //returns sort order -1, 1, or 0 (for before, after, or equal).
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return filteredData;
  },
  pagedItems() {
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = 0;
      if (this.Items.length > startIndex + this.pageSize) {
        endIndex = startIndex + this.pageSize;
      } else {
        endIndex =  this.filteredItems.length;
      }
      return this.filteredItems.slice(startIndex, endIndex);
    },


  },
  methods: {
    sortBy(column) {
    if (column === this.sortByColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortByColumn = column;
      this.sortDirection = 'asc';
    }
  },
  openFiltersSelector() {
      let componentProps = { filters: this.filters, headers: this.headers };
      eventBus.emit('filters-selector', {
        componentProps,
        cb: this.updateFilters
      });
    },
    handlePageChange(page) {
      if (page >= 1 && page <= this.totalPages) this.currentPage = page;
    },
    handlePageSizeChange(pageSize) {
      this.pageSize = Number(pageSize);
      this.currentPage = 1;
    },
    handleGoToFirstPage(){
      if(this.currentPage!=1){
          this.currentPage=1;
        }
    }
  }
}
</script>

<template>
    <div
      class="bg-gray-100 rounded-lg py-2 px-3 flex space-x-2 text-[#42526E] text-sm"
    >
      <div v-if="totalPages === 1" class="w-1/2 flex items-center">page 1</div>
      <div v-else class="w-1/2 flex items-center space-x-4">
        <div
          class="hover:text-[#007fff] cursor-pointer px-2 rounded"
          @click="changePage(currentPage - 1)"
        >
          <Icon name="chevron-left" :size="18" />
        </div>
  
        <div
          class="hover:text-[#007fff] cursor-pointer px-2 rounded-full"
          v-for="i in pages"
          :key="i"
          :class="{ 'text-black  bg-[#007fff]': i === currentPage }"
          @click="changePage(i)"
        >
          {{ i }}
        </div>
  
        <div
          class="hover:text-[#007fff] cursor-pointer px-2 rounded"
          @click="changePage(currentPage + 1)"
        >
          <Icon name="chevron-right" :size="21"  stroke="#3c3c3c"/>
        </div>
        <div>{{ totalPages }} pages</div>
      </div>
      <div class="w-1/2 flex space-x-2">
        <div class="flex space-x-2 items-center">
          <div class="w-3/4 text-right">Go to page</div>
          <BaseInput
            type="number"
            v-model="pageInput"
            padding="small"
            @enter="gotoPage"
          />
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  import BaseInput from '@/components/base/BaseInput.vue';
  import Icon from '@/components/shared/Icon/Icon.vue';
  export default {
    props: {
      currentPage: { type: Number },
      totalPages: { type: Number }
    },
    components: { BaseInput, Icon },
    computed: {
      pages() {
        let p = [];
        if (this.currentPage >= 2 && this.currentPage <= this.totalPages - 1)
          p = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
        if (this.currentPage === 1)
          p = [2, 3].reduce(
            (page, i) => {
              if (i <= this.totalPages) page.push(i);
              return page;
            },
            [1]
          );
        if (this.currentPage === this.totalPages) {
          p = [this.currentPage - 1, this.currentPage - 2].reduce(
            (page, i) => {
              if (i >= 1) page.unshift(i);
              return page;
            },
            [this.currentPage]
          );
        }
        return p;
      }
    },
    methods: {
      changePage(page) {
        this.$emit('changepage', page);
      },
      gotoPage() {
        this.changePage(Number(this.pageInput));
      }
    }
  };
  </script>
  
  <style></style>

  