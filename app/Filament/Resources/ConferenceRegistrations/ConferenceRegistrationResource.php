<?php

namespace App\Filament\Resources\ConferenceRegistrations;

use App\Filament\Resources\ConferenceRegistrations\Pages\CreateConferenceRegistration;
use App\Filament\Resources\ConferenceRegistrations\Pages\EditConferenceRegistration;
use App\Filament\Resources\ConferenceRegistrations\Pages\ListConferenceRegistrations;
use App\Filament\Resources\ConferenceRegistrations\Schemas\ConferenceRegistrationForm;
use App\Filament\Resources\ConferenceRegistrations\Tables\ConferenceRegistrationsTable;
use App\Models\ConferenceRegistration;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ConferenceRegistrationResource extends Resource
{
    protected static ?string $model = ConferenceRegistration::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return ConferenceRegistrationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ConferenceRegistrationsTable::configure($table);
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
            'index' => ListConferenceRegistrations::route('/'),
            'create' => CreateConferenceRegistration::route('/create'),
            'edit' => EditConferenceRegistration::route('/{record}/edit'),
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
