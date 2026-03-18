<x-filament-panels::page>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {{-- Custom widgets or charts would go here --}}
        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Data Submissions</h3>
            <p class="text-3xl font-bold text-primary-600">0</p>
            <p class="text-sm text-gray-500">Submissions this month</p>
        </div>

        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Active Studies</h3>
            <p class="text-3xl font-bold text-primary-600">0</p>
            <p class="text-sm text-gray-500">Across all countries</p>
        </div>

        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Pending Approvals</h3>
            <p class="text-3xl font-bold text-primary-600">0</p>
            <p class="text-sm text-gray-500">Awaiting governance review</p>
        </div>
    </div>
</x-filament-panels::page>