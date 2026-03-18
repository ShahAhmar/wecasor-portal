<?php

namespace App\Filament\Resources\DataSubmissions;

use App\Filament\Resources\DataSubmissions\Pages\CreateDataSubmission;
use App\Filament\Resources\DataSubmissions\Pages\EditDataSubmission;
use App\Filament\Resources\DataSubmissions\Pages\ListDataSubmissions;
use App\Filament\Resources\DataSubmissions\Pages\ViewDataSubmission;
use App\Filament\Resources\DataSubmissions\Schemas\DataSubmissionForm;
use App\Filament\Resources\DataSubmissions\Schemas\DataSubmissionInfolist;
use App\Filament\Resources\DataSubmissions\Tables\DataSubmissionsTable;
use App\Models\DataSubmission;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DataSubmissionResource extends Resource
{
    protected static ?string $model = DataSubmission::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static ?int $navigationSort = 5;
    protected static ?string $navigationLabel = 'Data Management';

    public static function form(Schema $schema): Schema
    {
        return DataSubmissionForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return DataSubmissionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DataSubmissionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDataSubmissions::route('/'),
            'create' => CreateDataSubmission::route('/create'),
            'view' => ViewDataSubmission::route('/{record}'),
            'edit' => EditDataSubmission::route('/{record}/edit'),
        ];
    }
}
