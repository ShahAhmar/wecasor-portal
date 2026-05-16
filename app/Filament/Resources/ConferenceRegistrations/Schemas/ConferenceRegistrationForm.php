<?php

namespace App\Filament\Resources\ConferenceRegistrations\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ConferenceRegistrationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('institution')
                    ->required(),
                TextInput::make('country')
                    ->required(),
                TextInput::make('role')
                    ->required(),
                TextInput::make('attendance_type')
                    ->required()
                    ->default('Physical'),
                TextInput::make('language')
                    ->required()
                    ->default('en'),
            ]);
    }
}
