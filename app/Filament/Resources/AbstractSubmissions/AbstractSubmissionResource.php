<?php

namespace App\Filament\Resources\AbstractSubmissions;

use App\Filament\Resources\AbstractSubmissions\Pages\CreateAbstractSubmission;
use App\Filament\Resources\AbstractSubmissions\Pages\EditAbstractSubmission;
use App\Filament\Resources\AbstractSubmissions\Pages\ListAbstractSubmissions;
use App\Filament\Resources\AbstractSubmissions\Pages\ViewAbstractSubmission;
use App\Filament\Resources\AbstractSubmissions\Schemas\AbstractSubmissionForm;
use App\Filament\Resources\AbstractSubmissions\Schemas\AbstractSubmissionInfolist;
use App\Filament\Resources\AbstractSubmissions\Tables\AbstractSubmissionsTable;
use App\Models\AbstractSubmission;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AbstractSubmissionResource extends Resource
{
    protected static ?string $model = AbstractSubmission::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return AbstractSubmissionForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return AbstractSubmissionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AbstractSubmissionsTable::configure($table);
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
            'index' => ListAbstractSubmissions::route('/'),
            'create' => CreateAbstractSubmission::route('/create'),
            'view' => ViewAbstractSubmission::route('/{record}'),
            'edit' => EditAbstractSubmission::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
