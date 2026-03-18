<?php

namespace App\Filament\Resources\AuditLogs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AuditLogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->disabled(),
                TextInput::make('action')
                    ->disabled(),
                TextInput::make('target_type')
                    ->disabled(),
                TextInput::make('target_id')
                    ->disabled(),
                \Filament\Forms\Components\KeyValue::make('details')
                    ->columnSpanFull()
                    ->disabled(),
            ]);
    }
}
