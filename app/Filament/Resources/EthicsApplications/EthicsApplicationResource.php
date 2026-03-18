<?php

namespace App\Filament\Resources\EthicsApplications;

use App\Filament\Resources\EthicsApplications\Pages\CreateEthicsApplication;
use App\Filament\Resources\EthicsApplications\Pages\EditEthicsApplication;
use App\Filament\Resources\EthicsApplications\Pages\ListEthicsApplications;
use App\Filament\Resources\EthicsApplications\Pages\ViewEthicsApplication;
use App\Filament\Resources\EthicsApplications\Schemas\EthicsApplicationForm;
use App\Filament\Resources\EthicsApplications\Schemas\EthicsApplicationInfolist;
use App\Filament\Resources\EthicsApplications\Tables\EthicsApplicationsTable;
use App\Models\EthicsApplication;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class EthicsApplicationResource extends Resource
{
    protected static ?string $model = EthicsApplication::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static ?int $navigationSort = 7;
    protected static ?string $navigationLabel = 'Ethics & Compliance';

    public static function form(Schema $schema): Schema
    {
        return EthicsApplicationForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return EthicsApplicationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EthicsApplicationsTable::configure($table);
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
            'index' => ListEthicsApplications::route('/'),
            'create' => CreateEthicsApplication::route('/create'),
            'view' => ViewEthicsApplication::route('/{record}'),
            'edit' => EditEthicsApplication::route('/{record}/edit'),
        ];
    }
}
