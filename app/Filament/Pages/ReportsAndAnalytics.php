<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use BackedEnum;

class ReportsAndAnalytics extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected string $view = 'filament.pages.reports-and-analytics';

    protected static ?int $navigationSort = 9;

    protected static ?string $navigationLabel = 'Reports & Analytics';
}
